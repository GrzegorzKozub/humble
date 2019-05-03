defmodule EventsWeb.EventViewTest do
  use EventsWeb.ConnCase, async: true

  test "converts date" do
    {:ok, date, _} = DateTime.from_iso8601("2015-01-23T09:05:07Z")
    formatted = EventsWeb.EventView.format_date(date)
    assert formatted == "23/1/2015 9:05"
  end
end
