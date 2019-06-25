defmodule Chop do
  def guess(actual, lo..hi) when lo <= hi and actual in lo..hi do
    current = chop(lo, hi)
    IO.puts("Is it #{current}?")
    guess(current, actual, lo..hi)
  end

  defp guess(current, actual, _) when current == actual, do: IO.puts("It's #{current}!")
  defp guess(current, actual, lo.._) when actual < current, do: guess(actual, lo..(current - 1))
  defp guess(current, actual, _..hi) when actual > current, do: guess(actual, (current + 1)..hi)

  defp chop(lo, hi), do: lo + div(hi - lo, 2)
end
