import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty({
        type: String,
        description: "username",
        default: "vishal.wandile@anka.co.in"
    })
    username: string;

    @ApiProperty({
        type: String,
        description: "password",
        default: "Anka@1234"
    })
    password: string;
}