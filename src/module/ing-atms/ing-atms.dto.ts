import { ApiProperty } from "@nestjs/swagger";

export class IngAtmsCreateDTO {
    @ApiProperty({
        type: String,
        description: "Id",
        default: "",
        required:false
    })
    id: string;
    @ApiProperty({
        type: String,
        description: "Name",
        default: ""
        
    })
    name: string;
}

export class IngAtmsUpdateDTO {
    @ApiProperty({
        type: String,
        description: "Id",
        default: "",
        required:false
    })
    id: string;
    @ApiProperty({
        type: String,
        description: "Name",
        default: ""
    })
    name: string;
}