#/bin/sh

PLATFORM=

if [[ $PLATFORM == "darwin" ]]
then
  go build --buildmode c-shared -o ./release/bunbot.dylib -ldflags "-s -w" main.go
elif [[ $PLATFORM == "linux" ]]
then
  go build --buildmode c-shared -o ./release/bunbot.so -ldflags "-s -w" main.go
elif [[ $PLATFORM == "windows" ]]
then
  go build --buildmode c-shared -o ./release/bunbot.exe -ldflags "-s -w" main.go
elif [[ $PLATFORM == "" ]]
then
  go build --buildmode c-shared -o ./release/bunbot.exe -ldflags "-s -w" main.go
  go build --buildmode c-shared -o ./release/bunbot.dylib -ldflags "-s -w" main.go
  go build --buildmode c-shared -o ./release/bunbot.so -ldflags "-s -w" main.go
else
  echo Unknown platform
fi
