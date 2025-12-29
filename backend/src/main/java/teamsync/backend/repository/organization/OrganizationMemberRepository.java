package teamsync.backend.repository.organization;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import teamsync.backend.entity.Organization;
import teamsync.backend.entity.Team;
import teamsync.backend.entity.OrganizationMember;
import teamsync.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface OrganizationMemberRepository extends CrudRepository<OrganizationMember, String> {

    List<OrganizationMember> findByUser(User user);

    @Query("select m from OrganizationMember m join Team t on m.team.id = t.id where t.id = m.team.id")
    List<OrganizationMember> findByTeam(@Param("team_id") String teamId);

    void deleteAllByTeam(Team team);

    Optional<OrganizationMember> findByTeamAndUser(Team team, User user);

    Optional<OrganizationMember> findByOrganizationAndUser(Organization organization, User user);
}
