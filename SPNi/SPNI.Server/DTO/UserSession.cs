namespace SPNI.Server.DTO
{
    public record UserSession(string? Id, string? Name, string? Email, string[]? Roles);
}
