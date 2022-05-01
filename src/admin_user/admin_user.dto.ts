import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty({
        type: String,
        description: "username",
        default: ""
    })
    username: string;

    @ApiProperty({
        type: String,
        description: "password",
        default: ""
    })
    password: string;
}