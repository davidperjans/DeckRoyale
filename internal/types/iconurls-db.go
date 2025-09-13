package types

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

func (i IconUrls) Value() (driver.Value, error) {
	return json.Marshal(i)
}

func (i *IconUrls) Scan(src interface{}) error {
	bytes, ok := src.([]byte)
	if !ok {
		return fmt.Errorf("unsupported type for IconUrls: %T", src)
	}
	return json.Unmarshal(bytes, i)
}
