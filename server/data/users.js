import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        role: 1,
        // isAdmin: true,
    },
    {
        name: "User",
        email: "user@example.com",
        role: 3,
        password: bcrypt.hashSync("123456", 10),
        
    },
    {
        name: "TienCM",
        email: "tiencm@gmail.com",
        role: 3,
        password: bcrypt.hashSync("123456", 10),    
    },
    {
        name: "Chu Mạnh Tiến",
        email: "chumanhtien@gmail.com",
        role: 3,
        password: bcrypt.hashSync("123456", 10),    
    },
];

export default users