#/bin/sh

CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/darwin-amd64 -ldflags "-s -w" main.go
CGO_ENABLED=1 GOOS=darwin GOARCH=arm64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/darwin-arm64 -ldflags "-s -w" main.go
CGO_ENABLED=1 GOOS=windows GOARCH=amd64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/windows-amd64 -ldflags "-s -w -H=windowsgui" main.go
CGO_ENABLED=1 GOOS=linux GOARCH=amd64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/linux-amd64 -ldflags "-s -w" main.go
CGO_ENABLED=1 GOOS=linux GOARCH=arm64 CC=~/go/bin/zigcc CXX=~/go/bin/zigcpp go build --buildmode c-shared -o ./release/linux-arm64 -ldflags "-s -w" main.go
