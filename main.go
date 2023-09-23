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
	"image"
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

type Coords struct {
	X int `json:"x"`
	Y int `json:"y"`
}

//export GetPixelColor
func GetPixelColor(x, y int) *C.char {
	s := robotgo.GetPixelColor(x, y)
	return ch(s)
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

//export DisplaysNum
func DisplaysNum() int {
	return robotgo.DisplaysNum()
}

type MyImage struct {
	img image.Image
}

func NewMyImage(img image.Image) *MyImage {
	return &MyImage{img: img}
}

//export CaptureImg
func CaptureImg(x, y, w, h int) unsafe.Pointer {
	var captured image.Image
	if x == 0 && y == 0 && w == 0 && h == 0 {
		captured = robotgo.CaptureImg()
	} else {
		captured = robotgo.CaptureImg(x, y, w, h)
	}

	img := NewMyImage(captured)

	size := C.size_t(unsafe.Sizeof(MyImage{}))
	ptr := C.malloc(size)
	if ptr == nil {
		panic("Failed to allocate memory")
	}

	myImg := (*MyImage)(ptr)
	*myImg = *img

	return ptr
}

//export FreeImage
func FreeImage(imagePtr unsafe.Pointer) {
	C.free(imagePtr)
}

//export SetDisplayID
func SetDisplayID(value int) {
	robotgo.DisplayID = value
}

//export Save
func Save(imagePtr unsafe.Pointer, path *C.char, quality int) {
	img := *(*image.Image)(imagePtr)
	err := robotgo.Save(img, str(path), quality)
	if err != nil {
		panic("Failed to save image")
	}
}

//export SaveJpeg
func SaveJpeg(imagePtr unsafe.Pointer, path *C.char, quality int) {
	img := *(*image.Image)(imagePtr)
	err := robotgo.SaveJpeg(img, str(path), quality)
	if err != nil {
		panic("Failed to save image")
	}
}

/*
.___  ___.   ______    __    __       _______. _______
|   \/   |  /  __  \  |  |  |  |     /       ||   ____|
|  \  /  | |  |  |  | |  |  |  |    |   (----`|  |__
|  |\/|  | |  |  |  | |  |  |  |     \   \    |   __|
|  |  |  | |  `--'  | |  `--'  | .----)   |   |  |____
|__|  |__|  \______/   \______/  |_______/    |_______|
*/

//export ScrollDir
func ScrollDir(x int, direction *C.char) {
	robotgo.ScrollDir(x, str(direction))
}

//export Scroll
func Scroll(x, y, msDelay int) {
	robotgo.Scroll(x, y, msDelay)
}

//export MilliSleep
func MilliSleep(tm int) {
	robotgo.MilliSleep(tm)
}

//export ScrollSmooth
func ScrollSmooth(toy, num, sleep, tox int) {
	robotgo.ScrollSmooth(toy, num, sleep, tox)
}

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

//export MoveRelative
func MoveRelative(x, y int) {
	robotgo.MoveRelative(x, y)
}

//export DragSmooth
func DragSmooth(x, y int) {
	robotgo.DragSmooth(x, y)
}

//export MoveSmooth
func MoveSmooth(x, y int, low, high float64) bool {
	return robotgo.MoveSmooth(x, y, low, high)
}

//export Toggle
func Toggle(key, direction *C.char) {
	robotgo.Toggle(str(key), str(direction))
}

//export Location
func Location() *C.char {
	x, y := robotgo.Location()
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

/*
 __  ___  ___________    ____ .______     ______        ___      .______       _______
|  |/  / |   ____\   \  /   / |   _  \   /  __  \      /   \     |   _  \     |       \
|  '  /  |  |__   \   \/   /  |  |_)  | |  |  |  |    /  ^  \    |  |_)  |    |  .--.  |
|    <   |   __|   \_    _/   |   _  <  |  |  |  |   /  /_\  \   |      /     |  |  |  |
|  .  \  |  |____    |  |     |  |_)  | |  `--'  |  /  _____  \  |  |\  \----.|  '--'  |
|__|\__\ |_______|   |__|     |______/   \______/  /__/     \__\ | _| `._____||_______/
*/

//export TypeStr
func TypeStr(c *C.char) {
	robotgo.TypeStr(str(c))
}

//export Sleep
func Sleep(tm int) {
	robotgo.Sleep(tm)
}

//export SetKeySleep
func SetKeySleep(tm int) {
	robotgo.KeySleep = tm
}

//export KeyTap
func KeyTap(key *C.char, vals *C.char) *C.char {
	arr := strings.Split(str(vals), ",")
	args := make([]interface{}, len(arr))
	for i, s := range arr {
		args[i] = s
	}
	err := robotgo.KeyTap(str(key), args...)
	if err != nil {
		return ech(err)
	}

	return ch("")
}

//export KeyToggle
func KeyToggle(key *C.char, vals *C.char) *C.char {
	arr := strings.Split(str(vals), ",")
	args := make([]interface{}, len(arr))
	for i, s := range arr {
		args[i] = s
	}
	err := robotgo.KeyToggle(str(key), args...)
	if err != nil {
		return ech(err)
	}

	return ch("")
}

//export WriteAll
func WriteAll(text *C.char) {
	robotgo.WriteAll(str(text))
}

//export ReadAll
func ReadAll() *C.char {
	result, err := robotgo.ReadAll()

	resultAndError, _ := json.Marshal(&ResultAndError{
		Result: result,
		Error:  sf(err),
	})
	return ch(string(resultAndError))
}

//export GetText
func GetText(imgPath *C.char) *C.char {
	result, err := robotgo.GetText(str(imgPath))

	resultAndError, _ := json.Marshal(&ResultAndError{
		Result: result,
		Error:  sf(err),
	})
	return ch(string(resultAndError))
}

func main() {} // Required but ignored
