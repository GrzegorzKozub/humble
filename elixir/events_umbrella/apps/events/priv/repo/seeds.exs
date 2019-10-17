# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Events.Repo.insert!(%Events.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Events.EventQueries.create(
  Events.Event.changeset(%Events.Event{}, %{
    title: "Nice lunch",
    location: "Downtown",
    date: "2019-06-02 12:00:00",
    description: nil
  })
)

Events.EventQueries.create(
  Events.Event.changeset(%Events.Event{}, %{
    title: "It's a date",
    location: "Favorite club",
    date: "2019-06-03 18:30:00",
    description: "Nothing ever works"
  })
)
