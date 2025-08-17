package kafka

import (
	"errors"
	"time"

	"github.com/segmentio/kafka-go"
)

type Client struct {
	Brokers []string
}

func NewClient(brokers []string) (*Client, error) {
	if len(brokers) == 0 || brokers[0] == "" {
		return nil, errors.New("brokers list cannot be empty")
	}

	return &Client{Brokers: brokers}, nil
}

func (c *Client) NewProducer() *kafka.Writer {
	return &kafka.Writer{
		Addr:         kafka.TCP(c.Brokers...),
		Balancer:     &kafka.LeastBytes{},
		RequiredAcks: kafka.RequireAll,
		Async:        true,
	}
}

func (c *Client) NewConsumer(topic, groupID string) *kafka.Reader {
	return kafka.NewReader(kafka.ReaderConfig{
		Brokers:        c.Brokers,
		Topic:          topic,
		GroupID:        groupID,
		MinBytes:       10e3,
		MaxBytes:       10e6,
		CommitInterval: time.Second,
	})
}
