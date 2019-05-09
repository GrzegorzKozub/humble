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

  def create(conn, %{errors: errors}) do
    render(conn, "create.html", changeset: errors)
  end

  def create(conn, _params) do
    changeset = Events.Event.changeset(%Events.Event{}, %{})
    render(conn, "create.html", changeset: changeset)
  end

  def add(conn, %{"event" => event}) do
    event = Map.update!(event, "date", fn d -> d <> ":00" end)
    changeset = Events.Event.changeset(%Events.Event{}, event)

    case Events.EventQueries.create(changeset) do
      {:ok, %{id: id}} -> redirect(conn, to: Routes.event_path(conn, :show, id))
      {:error, reasons} -> create(conn, %{errors: reasons})
    end
  end
end
