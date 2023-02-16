import {AuthService} from "./AuthService";
import {config} from "./config";


test('base test', () => {
    const authService = new AuthService();
    const user = authService.login(config.TEST_USER_NAME, config.TEST_USER_PASSWORD);
    expect(user).toBeDefined();
    console.log(user)

});
