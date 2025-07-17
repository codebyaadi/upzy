package main

import (
	"fmt"
	"time"

	"github.com/codebyaadi/upzy/packages/go-utils/strings" // Still keeping this as context
)

func main() {
	workerID := "upzy-simple-worker-001"
	checkInterval := 2 * time.Second // Perform a "check" every 2 seconds

	fmt.Printf("Worker '%s' starting up. Will perform simple checks every %s.\n", workerID, checkInterval)

	// This is your worker's continuous loop
	for {
		// --- WORKER'S SIMULATED TASK ---
		// In a real upzy worker, this is where it would:
		// - Ping a URL
		// - Check a service port
		// - Run an API call
		// - Report status back to the main upzy server
		// For now, it just prints a message.

		heartbeatMessage := fmt.Sprintf("Worker '%s' performing a simulated check at %s...", workerID, time.Now().Format("15:04:05"))
		fmt.Println(heartbeatMessage)

		// Example of using your go-utils/strings package (optional, just to show it's there)
		processedMessage := strings.Reverse(heartbeatMessage) // Just reversing for a simple "task"
		fmt.Printf("   (Processed: %s)\n", processedMessage)
		// --- END OF SIMULATED TASK ---

		// Wait for the next interval before doing it again
		time.Sleep(checkInterval)
	}
}
