# Class Flow

```
REQUEST
│
└── Controller
    │ @Post()
    │ create(@Body() createUserDto: CreateUserDto) {
    │   return this.userService.create(createUserDto);
    │ }
    └── Service
        │ async create(createUserDto: CreateUserDto): Promise<User> {
        │   ...
        │ }
        └──
```
