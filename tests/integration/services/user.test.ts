import mongoose from 'mongoose';
import userService from '../../../src/services/user';
import userModel from '../../../src/models/user';
const uri = 'mongodb://0.0.0.0:27017/helprtest';

describe('userService Integration Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(uri).then(() => {
      console.log('test db connected');
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  describe('createUser', () => {
    it('should create a new user in the database', async () => {
      const userData = {
        accountType: 'Individual',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      };

      const createdUser = await userService.createUser(
        userData.accountType,
        userData.name,
        userData.email,
        userData.password
      );

      expect(createdUser).toHaveProperty('_id');
      expect(createdUser.name).toBe(userData.name);
      expect(createdUser.email).toBe(userData.email);
      expect(createdUser.password).not.toBe(userData.password);
    });
    it('should throw an error if user creation fails', async () => {
      // throw an error by making the sending duplicate email
      await userModel.create({
        accountType: 'Individual',
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123',
      });
      await expect(
        userService.createUser(
          'Individual',
          'Jane Doe',
          'existing@example.com',
          'password123'
        )
      ).rejects.toThrow();
    });
  });

  describe('userByEmail', () => {
    it('should retrieve a user by email', async () => {
      const userData = {
        accountType: 'Individual',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      };
      await userModel.create(userData);

      const retrievedUser = await userService.userByEmail('jane@example.com');

      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?.email).toBe('jane@example.com');
    });
    it('should return null if user is not found by email', async () => {
      const retrievedUser = await userService.userByEmail(
        'nonexistent@example.com'
      );
      expect(retrievedUser).toBeNull();
    });
    it('should throw an error', async () => {
      await mongoose.disconnect();
      await expect(
        userService.userByEmail('jane@example.com')
      ).rejects.toThrow();
      await mongoose.connect(uri).then(() => {
        console.log('test db connected');
      });
    });
  });

  describe('userById', () => {
    it('should retrieve a user by ID', async () => {
      const userData = {
        accountType: 'Individual',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      };
      const newUser = await userModel.create(userData);
      const retrievedUser = await userService.userById(newUser.id)

      expect(retrievedUser).toBeDefined()
      expect(retrievedUser?.id).toBe(newUser.id)
    });
    it('should return null if user is not found by id', async () => {
        const retrievedUser = await userService.userById('66d9c69406935a2fe5b99817')
        expect(retrievedUser).toBeNull()
    });
    it('should throw an error', async () => {
        await mongoose.disconnect();
        await expect(
          userService.userById('66d9c69406935a2fe5b99817')
        ).rejects.toThrow();
        await mongoose.connect(uri).then(() => {
          console.log('test db connected');
        });
    })
  });
});
