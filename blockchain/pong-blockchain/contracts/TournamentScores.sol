// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TournamentDetails {
    struct Player {
        string name;
        uint256 rank;
    }

    struct Tournament {
        string name;
        Player player1;
        Player player2;
        Player player3;
        Player player4;
        uint256 timestamp;
    }

    Tournament[] public tournaments;

    event TournamentAdded(string tournamentName, Player player1, Player player2, Player player3, Player player4, uint256 timestamp);

    function addTournament(
        string memory name,
        string memory player1Name, uint256 player1Rank,
        string memory player2Name, uint256 player2Rank,
        string memory player3Name, uint256 player3Rank,
        string memory player4Name, uint256 player4Rank
    ) public {
        Tournament memory newTournament = Tournament({
            name: name,
            player1: Player(player1Name, player1Rank),
            player2: Player(player2Name, player2Rank),
            player3: Player(player3Name, player3Rank),
            player4: Player(player4Name, player4Rank),
            timestamp: block.timestamp
        });

        tournaments.push(newTournament);
        emit TournamentAdded(name, newTournament.player1, newTournament.player2, newTournament.player3, newTournament.player4, newTournament.timestamp);
    }

    function getTournaments() public view returns (Tournament[] memory) {
        return tournaments;
    }
}
