from pydantic import BaseModel, EmailStr, Field


class NewSiteUser(BaseModel):
    first_name: str = Field(default="")
    last_name: str = Field(default="")
    email: EmailStr | str = Field(default="")
    phone: str = Field(default="")
    password: str = Field(default="")