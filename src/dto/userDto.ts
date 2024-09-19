import { Gender } from "../enums/genderEnum";

export class UserDTO {
    public name: string = '';
    public yearOfBirth: string = '';
    public gender: Gender = Gender.Undefined;;
}
