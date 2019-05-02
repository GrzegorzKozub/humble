defmodule Events.EventQueries do
  import Ecto.Query
  alias Events.{Repo, Event}

  def get_all, do: Repo.all(from(Event))
  def get_by_id(id), do: Repo.get(Events, id)

  def get_all_for_location(location) do
    query =
      from e in Event,
        where: e.location == ^location

    Repo.all(query)
  end

  def create(event), do: Repo.insert!(event)
end
