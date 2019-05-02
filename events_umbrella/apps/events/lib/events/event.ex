defmodule Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :title, :string
    field :location, :string
    field :date, :utc_datetime
    field :description, :string
    timestamps()
  end

  @required_fields ~w(title location date)a
  @optional_fields ~w(description)a

  def changeset(event, params \\ %{}) do
    event
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_change(:date, &cant_be_in_the_past/2)
  end

  defp cant_be_in_the_past(_, value) do
    DateTime.compare(value, DateTime.utc_now())
    |> get_error
  end

  defp get_error(relation) when relation == :lt, do: [date: "can't be in the past"]
  defp get_error(_), do: []
end
