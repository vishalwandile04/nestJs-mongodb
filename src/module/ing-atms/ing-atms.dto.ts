import { ApiProperty } from "@nestjs/swagger";

export class GeoLocation {
    @ApiProperty({
        type: String,
        description: "lat",
        default: "",
        required: false
    })
    lat: string;

    @ApiProperty({
        type: String,
        description: "lng",
        default: "",
        required: false
    })
    lng: string;
}

export class IngAtmsCreateDTO {
    @ApiProperty({
        type: String,
        description: "Id",
        default: "",
        required: false
    })
    id: string;
    @ApiProperty({
        type: String,
        description: "Name",
        default: ""

    })
    name: string;

    @ApiProperty({
        type: String,
        description: "street",
        default: ""

    })
    street: string;


    @ApiProperty({
        type: String,
        description: "city",
        default: ""

    })
    city: string;

    @ApiProperty({
        type: String,
        description: "geoLocation",
        default: ""

    })
    geoLocation: GeoLocation;
}

export class IngAtmsUpdateDTO {
    @ApiProperty({
        type: String,
        description: "Id",
        default: "",
        required: false
    })
    id: string;
    @ApiProperty({
        type: String,
        description: "Name",
        default: ""
    })
    name: string;
    @ApiProperty({
        type: String,
        description: "street",
        default: ""

    })
    street: string;


    @ApiProperty({
        type: String,
        description: "city",
        default: ""

    })
    city: string;

    @ApiProperty({
        type: String,
        description: "geoLocation",
        default: ""

    })
    geoLocation: GeoLocation;
}