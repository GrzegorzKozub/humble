defmodule EventsWeb.EventView do
  use EventsWeb, :view

  def format_date(date) do
    "#{date.day}/#{date.month}/#{date.year} #{date.hour}:#{pad(date.minute)}"
  end

  defp pad(int) do
    int
    |> Integer.to_string()
    |> String.pad_leading(2, "0")
  end
end
