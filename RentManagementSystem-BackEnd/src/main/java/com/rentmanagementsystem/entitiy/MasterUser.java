package com.rentmanagementsystem.entitiy;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "master_users", schema = "public")
public class MasterUser {

    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "username", nullable = false, unique = true, length = 100)
    private String username;

    @Column(name = "full_name", length = 150)
    private String fullName;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "mobile_no", length = 150)
    private String mobileNo;

    @Column(name = "user_name", length = 150)
    private String userName;

    @Column(name = "user_password", length = 150)
    private String userPassword;

    @Column(name = "user_is_activate")
    private Boolean userIsActivate = true;

    @Column(name = "user_is_deleted")
    private Boolean userIsDeleted = false;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

   
}


