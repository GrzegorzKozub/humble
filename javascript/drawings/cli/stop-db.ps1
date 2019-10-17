docker rm $(docker stop $(docker ps -a --filter="name=drawings" --format="{{.ID}}"))
