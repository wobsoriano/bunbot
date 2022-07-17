#/bin/sh

go build --buildmode c-shared -o ./release/bunbot.dylib -ldflags "-s -w" main.go
# CGO_ENABLED=1 GOOS=windows GOARCH=amd64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/bunbot.dll -ldflags "-s -w -H=windowsgui" main.go
# CGO_ENABLED=1 GOOS=linux GOARCH=amd64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/bunbot.so -ldflags "-s -w" main.go
