// Copyright 2016 The go-vgo Project Developers. See the COPYRIGHT
// file at the top-level directory of this distribution and at
// https://github.com/go-vgo/robotgo/blob/master/LICENSE
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

/*

Package robotgo Go native cross-platform system automation.

Please make sure Golang, GCC is installed correctly before installing RobotGo;

See Requirements:
	https://github.com/go-vgo/robotgo#requirements

Installation:
	go get -u github.com/go-vgo/robotgo

C-shared:
	go get -v github.com/vcaesar/gocs

	gocs -n robotgo
*/

package main

/*
#include <stdlib.h>
#include <string.h>
*/
import "C"

import (
	"encoding/json"
	"fmt"
	"strings"
	"unsafe"

	"github.com/go-vgo/robotgo"
)

type ResultAndError struct {
	Result string `json:"result"`
	Error  string `json:"error"`
}

func ch(str string) *C.char {
	return C.CString(str)
}

func str(ch *C.char) string {
	return C.GoString(ch)
}

func sf(err error) string {
	if err == nil {
		return ""
	}

	return fmt.Sprintf("%s", err)
}

func ech(err error) *C.char {
	return ch(sf(err))
}

func toStr(arr interface{}) string {
	return strings.Trim(fmt.Sprint(arr), "[]")
}

//export FreeString
func FreeString(str *C.char) {
	fmt.Printf("freeing %v... \n", str)
	C.free(unsafe.Pointer(str))
}

//export GetVersion
func GetVersion() *C.char {
	s := robotgo.GetVersion()
	return ch(s)
}

/*
      _______.  ______ .______       _______  _______ .__   __.
    /       | /      ||   _  \     |   ____||   ____||  \ |  |
   |   (----`|  ,----'|  |_)  |    |  |__   |  |__   |   \|  |
    \   \    |  |     |      /     |   __|  |   __|  |  . `  |
.----)   |   |  `----.|  |\  \----.|  |____ |  |____ |  |\   |
|_______/     \______|| _| `._____||_______||_______||__| \__|
*/

//export GetMouseColor
func GetMouseColor() *C.char {
	s := robotgo.GetMouseColor()
	return ch(s)
}

type Coords struct {
	X int `json:"x"`
	Y int `json:"y"`
}

//export GetScreenSize
func GetScreenSize() *C.char {
	x, y := robotgo.GetScreenSize()
	coords, _ := json.Marshal(&Coords{
		X: x,
		Y: y,
	})
	return ch(string(coords))
}

//export GetScaleSize
func GetScaleSize() *C.char {
	x, y := robotgo.GetScaleSize()
	coords, _ := json.Marshal(&Coords{
		X: x,
		Y: y,
	})
	return ch(string(coords))
}

/*
.___  ___.   ______    __    __       _______. _______
|   \/   |  /  __  \  |  |  |  |     /       ||   ____|
|  \  /  | |  |  |  | |  |  |  |    |   (----`|  |__
|  |\/|  | |  |  |  | |  |  |  |     \   \    |   __|
|  |  |  | |  `--'  | |  `--'  | .----)   |   |  |____
|__|  |__|  \______/   \______/  |_______/    |_______|
*/

//export SetMouseSleep
func SetMouseSleep(millisecond int) {
	robotgo.MouseSleep = millisecond
}

//export ScrollMouse
func ScrollMouse(x, y int) {
	robotgo.Scroll(x, y)
}

//export Move
func Move(x, y int) {
	robotgo.Move(x, y)
}

//export MoveSmooth
func MoveSmooth(x, y int, low, high float64) bool {
	return robotgo.MoveSmooth(x, y, low, high)
}

//export GetMousePos
func GetMousePos() *C.char {
	x, y := robotgo.GetMousePos()
	coords, _ := json.Marshal(&Coords{
		X: x,
		Y: y,
	})
	return ch(string(coords))
}

//export Click
func Click(btn *C.char, doublec bool) {
	robotgo.Click(str(btn), doublec)
}

func main() {} // Required but ignored
