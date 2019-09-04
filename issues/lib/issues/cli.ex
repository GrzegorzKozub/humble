defmodule Issues.CLI do
  @default_count 3
  def run(argv) do
    parse_args(argv)
    |> process
  end

  def parse_args(argv) do
    OptionParser.parse(argv, swithces: [help: :boolean], aliases: [h: :help], strict: [])
    |> elem(1)
    |> args_to_internal_representation
  end

  defp args_to_internal_representation([user, project, count]) do
    {user, project, String.to_integer(count)}
  end

  defp args_to_internal_representation([user, project]) do
    {user, project, @default_count}
  end

  defp args_to_internal_representation(_) do
    :help
  end

  defp process(:help) do
    IO.puts("""
    usage: issues <user> <project> [ count | #{@default_count} ]
    """)

    System.halt(0)
  end

  defp process({user, project, count}) do
    Issues.GithubIssues.fetch(user, project)
    |> decode_response
    |> sort_descending
    |> last(count)
  end

  defp decode_response({:ok, body}), do: body

  defp decode_response({:error, error}) do
    IO.puts("Error fetching from Github: #{error["message"]}")
    System.halt(2)
  end

  def sort_descending(issues) do
    issues
    |> Enum.sort(fn i1, i2 -> i1["created_at"] >= i2["created_at"] end)
  end

  defp last(issues, count) do
    issues |> Enum.take(count) |> Enum.reverse()
  end
end
