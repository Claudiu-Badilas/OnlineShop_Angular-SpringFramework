package com.example.backend.constant;

public class SecurityConstant {

    public static final long EXPIRATION_TIME = 432_000_000;  // 5 days expressed in milliseconds;
    public static final String TOKEN_HEADER = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    public static final String ONLINE_SHOP_SC = "Online Shop, SC";
    public static final String GET_ARRAYS_ADMINISTRATION = "User Management Online Shop";
    public static final String AUTHORITIES = "authorities";
    public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page";
    public static final String ACCESS_DENIED_MESSAGE = "You do not have permission to access this info";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
//    public static final String[] PUBLIC_URLS = {"/user/**", "/user/image/**", "/rentLocation/**", "/rental/**", "/reservation/**"};
    public static final String[] PUBLIC_URLS = {"**"};
}
