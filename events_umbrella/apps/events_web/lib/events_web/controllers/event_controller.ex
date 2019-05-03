defmodule EventsWeb.EventController do
  use EventsWeb, :controller

  def show(conn, %{"id" => id}) do
    event =
      Events.EventQueries.get_by_id(id)
      |> IO.inspect()

    render(conn, "details.html", event: event)
  end
end
