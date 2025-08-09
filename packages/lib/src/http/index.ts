/**
 * @interface ApiConfig
 * @description Configuration object for the HttpClient.
 */
interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  credentials?: "include" | "same-origin" | "omit";
}

/**
 * @class HttpError
 * @description Custom error class for handling HTTP request errors.
 * It includes the status code, the URL, and the response body for easier debugging.
 */
export class HttpError extends Error {
  status: number;
  url: string;
  body: any;

  constructor(message: string, status: number, url: string, body: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

/**
 * @class HttpClient
 * @description A versatile fetch wrapper for making HTTP requests with built-in auth.
 * It can be used in various JavaScript environments, including Node.js, Next.js, and Nest.js.
 * It supports a configuration object for base URL, default headers, and credentials.
 */
export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private authToken: string | null = null;
  private credentials?: "include" | "same-origin" | "omit";

  /**
   * @constructor
   * @param {ApiConfig} config - The configuration for the client.
   */
  constructor(config: ApiConfig) {
    // Ensure the base URL does not have a trailing slash
    this.baseUrl = config.baseUrl.endsWith("/")
      ? config.baseUrl.slice(0, -1)
      : config.baseUrl;
    this.defaultHeaders = config.headers || {};
    this.credentials = config.credentials;
  }

  /**
   * @method setAuthToken
   * @description Sets or clears the authorization token for subsequent requests.
   * @param {string | null} token - The JWT or other bearer token. Pass null to clear it.
   */
  public setAuthToken(token: string | null) {
    this.authToken = token;
  }

  /**
   * @private
   * @method request
   * @description A private helper method to handle all HTTP requests.
   * @param {string} path - The endpoint path to append to the base URL.
   * @param {RequestInit} options - The native fetch options.
   * @returns {Promise<T>} - A promise that resolves with the JSON response.
   */
  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    // Construct the full URL, handling absolute URLs provided in the path
    const fullUrl =
      path.startsWith("http://") || path.startsWith("https://")
        ? path
        : `${this.baseUrl}${path}`;

    // Merge headers: default instance headers, then per-request headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...this.defaultHeaders,
      ...(options.headers as Record<string, string>),
    };

    // Automatically add the authorization header if a token is set
    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    try {
      // The 'options' object passed to the method will override any defaults.
      // We set the instance-level default credentials first, then spread the
      // per-request options, which will override the default if specified.
      const response = await fetch(fullUrl, {
        credentials: this.credentials,
        ...options,
        headers,
      });

      if (!response.ok) {
        // Attempt to parse error response body for more context
        let errorBody;
        try {
          errorBody = await response.json();
        } catch (e) {
          errorBody = { message: response.statusText };
        }
        // Throw a custom HttpError with detailed information
        throw new HttpError(
          `Request failed with status ${response.status}`,
          response.status,
          fullUrl,
          errorBody,
        );
      }

      // Handle cases with no content in the response
      if (response.status === 204) {
        return null as T;
      }

      // Return the JSON response, cast to the generic type T
      return response.json() as Promise<T>;
    } catch (error) {
      // If it's not already our custom HttpError, wrap it for consistency.
      // This catches network errors (e.g., DNS resolution failure).
      if (!(error instanceof HttpError)) {
        console.error("A network or unexpected error occurred:", error);
        throw new HttpError(
          (error as Error).message || "An unexpected network error occurred.",
          0, // Status code 0 indicates a client-side or network error
          fullUrl,
          null,
        );
      }
      // Re-throw the original HttpError
      throw error;
    }
  }

  /**
   * @method get
   * @description Performs a GET request.
   * @param {string} path - The endpoint path.
   * @param {RequestInit} [options] - Optional fetch options, including `credentials`.
   * @returns {Promise<T>} - A promise that resolves with the JSON response.
   */
  public get<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  /**
   * @method post
   * @description Performs a POST request.
   * @param {string} path - The endpoint path.
   * @param {any} body - The request body, which will be stringified.
   * @param {RequestInit} [options] - Optional fetch options, including `credentials`.
   * @returns {Promise<T>} - A promise that resolves with the JSON response.
   */
  public post<T>(
    path: string,
    body: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * @method put
   * @description Performs a PUT request.
   * @param {string} path - The endpoint path.
   * @param {any} body - The request body, which will be stringified.
   * @param {RequestInit} [options] - Optional fetch options, including `credentials`.
   * @returns {Promise<T>} - A promise that resolves with the JSON response.
   */
  public put<T>(
    path: string,
    body: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  /**
   * @method delete
   * @description Performs a DELETE request.
   * @param {string} path - The endpoint path.
   * @param {RequestInit} [options] - Optional fetch options, including `credentials`.
   * @returns {Promise<T>} - A promise that resolves with the JSON response.
   */
  public delete<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}
