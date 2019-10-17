defmodule EventsWeb.AuthorizedPlug do
  import Plug.Conn
  import Phoenix.Controller

  def init(opts), do: opts

  def call(conn, name) do
    authorize_user(conn, conn.cookies["user_name"], name)
  end

  def authorize_user(conn, nil, _) do
    conn
    |> redirect(to: "/login")
    |> halt
  end

  def authorize_user(conn, user_name, name) when user_name === name, do: conn
  def authorize_user(conn, _, _), do: authorize_user(conn, nil, nil)
end
