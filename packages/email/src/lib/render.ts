import { render } from "@react-email/render";
import * as React from "react";

/**
 * Renders a React Email component to HTML and plain text.
 * @param EmailComponent The React component for the email template.
 * @param props The props to pass to the email component.
 * @returns An object containing the HTML and plain text versions of the email.
 */
export async function renderEmail<T extends React.ComponentType<any>>(
  EmailComponent: T,
  props: React.ComponentProps<T>,
) {
  // Render the React Email component to an HTML string
  const html = await render(React.createElement(EmailComponent, props), {
    pretty: true, // Format the HTML for readability
  });

  // Render the React Email component to a plain text string
  const text = await render(React.createElement(EmailComponent, props), {
    plainText: true, // Render as plain text
  });

  return { html, text };
}
