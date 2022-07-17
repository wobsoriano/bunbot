#/bin/sh

go build --buildmode c-shared -o ./release/bunbot.dylib -ldflags "-s -w" main.go
