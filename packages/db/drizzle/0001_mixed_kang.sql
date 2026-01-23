CREATE TABLE "checks" (
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"monitor_id" text NOT NULL,
	"trace_id" text NOT NULL,
	"request_id" text NOT NULL,
	"probe_region" varchar(50) NOT NULL,
	"is_success" boolean NOT NULL,
	"status_code" integer,
	"latency_total_ms" integer NOT NULL,
	"error_message" text,
	"timings" jsonb
);
--> statement-breakpoint
ALTER TABLE "checks" ADD CONSTRAINT "checks_monitor_id_monitors_id_fk" FOREIGN KEY ("monitor_id") REFERENCES "public"."monitors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "checks_trace_id_idx" ON "checks" USING btree ("trace_id");--> statement-breakpoint
CREATE INDEX "checks_monitor_id_timestamp_idx" ON "checks" USING btree ("monitor_id","timestamp");