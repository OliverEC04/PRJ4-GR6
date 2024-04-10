namespace UserBackend.Data.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Password { get; set; }

        public override string ToString()
        {
            return "UserId: " + UserId + ", Name: " + Name + ", Email: " + Email + ", DateOfBirth: " + DateOfBirth + ", Password: " + Password;
        }
    }
}
