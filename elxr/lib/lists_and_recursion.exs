defmodule ListsAndRecursion do
  def mapsum([], _func), do: 0

  def mapsum([head | tail], func) do
    func.(head) + mapsum(tail, func)
  end

  def maxim([head | tail]), do: maxim(tail, head)
  def maxim([], curr), do: curr

  def maxim([head | tail], curr) when curr >= head do
    maxim(tail, curr)
  end

  def maxim([head | tail], curr) when curr < head do
    maxim(tail, head)
  end

  def caesar([], _a), do: []

  def caesar([head | tail], a) when head + a > ?z do
    [head + a - (?z - ?a + 1) | caesar(tail, a)]
  end

  def caesar([head | tail], a) do
    [head + a | caesar(tail, a)]
  end
end
