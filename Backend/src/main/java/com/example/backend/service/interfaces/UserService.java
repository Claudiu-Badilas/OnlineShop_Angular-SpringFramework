package com.example.backend.service.interfaces;

import com.example.backend.exception.model.*;
import com.example.backend.model.user.User;
//import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

        User register(String firstName, String lastName, String username, String email, String password)
                        throws UserNotFoundException, UsernameExistException, EmailExistException,
                        javax.mail.MessagingException;

        List<User> getUsers();

        User findUserByUsername(String username);

        User findUserByEmail(String email);

        User updateUser(String currentUsername, String newFirstName, String newLastName, String newUsername,
                        String newEmail, MultipartFile profileImage) throws UserNotFoundException,
                        UsernameExistException, EmailExistException, IOException, NotAnImageFileException;

        void deleteUser(String username) throws IOException;

        void resetPassword(String email, String password) throws javax.mail.MessagingException, EmailNotFoundException;

        User updateProfileImage(String username, MultipartFile profileImage) throws UserNotFoundException,
                        UsernameExistException, EmailExistException, IOException, NotAnImageFileException;

}
