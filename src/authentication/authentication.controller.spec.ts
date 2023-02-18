import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const email = 'test@test.com';
const password = 'password';
const confirmPassword = 'password';
const user = { email, password } as User;
const userWithId = { id: 1, email, password } as User;

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let service: AuthenticationService;
  let userService: UserService;

  beforeEach(async () => {
    service = new AuthenticationService();
    userService = new UserService();
    controller = new AuthenticationController(service, userService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should throw an error if the password and confirm passwords dont match', async () => {
      await expect(
        controller.register({
          email: undefined,
          password,
          confirmPassword: 'as',
        }),
      ).rejects.toThrow('Password and Confirm Password do not match');
    });
    it('should throw an error if the email is already registered', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => user as User);
      await expect(
        controller.register({
          email,
          password,
          confirmPassword,
        }),
      ).rejects.toThrow('This email is already registered');
    });
    it('should register the user if inputs are correct', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => null);
      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(async () => userWithId);
      await expect(
        controller.register({
          email: 'test@test.com',
          password: 'password',
          confirmPassword: 'password',
        }),
      ).resolves.toStrictEqual(userWithId);
    });
  });
  describe('login', () => {
    it('should throw an error if the email is not registered', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => null);
      await expect(
        controller.login({
          email,
          password,
        }),
      ).rejects.toThrow('This email is not registered');
    });
    it('should throw an error if the password is incorrect', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(async () => user);
      jest.spyOn(service, 'hashPassword').mockImplementation(async () => 'as');
      await expect(
        controller.login({
          email,
          password,
        }),
      ).rejects.toThrow('Incorrect password');
    });
  });
});
