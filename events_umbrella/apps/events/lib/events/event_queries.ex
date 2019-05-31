defmodule Events.EventQueries do
  import Ecto.Query
  alias Events.{Repo, Event}

  def get_all, do: Repo.all(from(Event))
  def get_by_id(id), do: Repo.get(Event, id)

  def get_all_for_location(location) do
    query =
      from(e in Event,
        where: e.location == ^location
      )

    Repo.all(query)
  end

  def create(event), do: Repo.insert(event)

  def decrease_quantity(id, quantity) do
    event = Repo.get!(Event, id)

    changes =
      Ecto.Changeset.change(
        event,
        quantity_available: event.quantity_available - String.to_integer(quantity)
      )

    Repo.update(changes)
  end
end
