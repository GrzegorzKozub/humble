defmodule EventsWeb.EventController do
  use EventsWeb, :controller

  def list(conn, _params) do
    events = Events.EventQueries.get_all()
    render(conn, "list.html", events: events)
  end

  def show(conn, %{"id" => id}) do
    event =
      Events.EventQueries.get_by_id(id)
      |> IO.inspect()

    render(conn, "details.html", event: event)
  end
end
