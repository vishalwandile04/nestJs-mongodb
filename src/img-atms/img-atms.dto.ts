import { ApiProperty } from "@nestjs/swagger";

export class ImgAtmsDTO {
    @ApiProperty({
        type: String,
        description: "Name",
        default: ""
    })
    name: string;
}