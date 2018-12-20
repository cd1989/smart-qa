package controllers

import "time"

type DataResponse struct {
	Data string `json:"data"`
}

type Environment struct {
	Name string `json:"name"`
	Address string `json:"address"`
	Registry string `json:"registry"`
	CreateTime time.Time `json:"creation_time,omitempty"`
}