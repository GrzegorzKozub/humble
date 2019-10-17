defmodule EventsWeb.EventChannel do
  use Phoenix.Channel

  def join("event:" <> event_id, _message, _socket) when event_id <= 0 do
    {:error, %{reason: "invalid event id"}}
  end

  def join("event:" <> _event_id, _message, socket) do
    {:ok, socket}
  end

  def send_update(event) do
    payload = %{"quantity" => event.quantity_available}
    EventsWeb.Endpoint.broadcast("event:#{event.id}", "update_quantity", payload)
  end
end
