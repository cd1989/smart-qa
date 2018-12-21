package controllers

import "time"

type DataResponse struct {
	Data string `json:"data"`
}

type Environment struct {
	Name       string    `json:"name"`
	Address    string    `json:"address"`
	Registry   string    `json:"registry"`
	CreateTime time.Time `json:"creation_time,omitempty"`
}

type Record struct {
	ID          string    `json:"id"`
	Environment string    `json:"environment"`
	Suite       string    `json:"suite"`
	TestTime    time.Time `json:"testTime"`
	Succeed     bool      `json:"succeed"`
}

type TestRequst struct {
	Environment string `json:"envName"`
	Suite       string `json:"testSuite"`
}
