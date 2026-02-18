export default class UserDTO {
    contructor(user) {
        this.full_name = `${user.first_name} ${user.last_name}`;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
    }
}