export function submitTournament(
    event,
    player = null,
    playerscore = null,
    name = null
    ) {
    let web3;
    let contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your deployed contract address
    let abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "tournamentName",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "indexed": false,
            "internalType": "struct TournamentDetails.Player",
            "name": "player1",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "indexed": false,
            "internalType": "struct TournamentDetails.Player",
            "name": "player2",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "indexed": false,
            "internalType": "struct TournamentDetails.Player",
            "name": "player3",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "indexed": false,
            "internalType": "struct TournamentDetails.Player",
            "name": "player4",
            "type": "tuple"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "TournamentAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "player1Name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "player1Rank",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "player2Name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "player2Rank",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "player3Name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "player3Rank",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "player4Name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "player4Rank",
            "type": "uint256"
          }
        ],
        "name": "addTournament",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTournaments",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "rank",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct TournamentDetails.Player",
                "name": "player1",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "rank",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct TournamentDetails.Player",
                "name": "player2",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "rank",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct TournamentDetails.Player",
                "name": "player3",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "rank",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct TournamentDetails.Player",
                "name": "player4",
                "type": "tuple"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct TournamentDetails.Tournament[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "tournaments",
        "outputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "internalType": "struct TournamentDetails.Player",
            "name": "player1",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "internalType": "struct TournamentDetails.Player",
            "name": "player2",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "internalType": "struct TournamentDetails.Player",
            "name": "player3",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
              }
            ],
            "internalType": "struct TournamentDetails.Player",
            "name": "player4",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    let contract;

    // Function to initialize web3 and request account access
    async function init() {
        if (typeof window.ethereum !== 'undefined') {
            // Initialize web3 instance
            web3 = new Web3(window.ethereum);

            // Request account access2
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Connected account:', accounts[0]);

                // Initialize contract instance
                contract = new web3.eth.Contract(abi, contractAddress);
            } catch (error) {
                console.error("User denied account access", error);
            }
        } else {
            console.log('Please install MetaMask!');
        }
    }

    // Submit score to contract
    async function submitScore() {
        const playerName = player;
        const score = playerscore;

        if (!contract) {
            alert('Contract is not initialized. Please refresh the page.');
            return;
        }

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        try {
            await contract.methods.submitScore(playerName, score).send({ from: account });
            alert('Score Submitted!');
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    }

    // Get scores from the contract
    async function getScores() {
        if (!contract) {
            alert('Contract is not initialized. Please refresh the page.');
            return;
        }

        try {
            const scores = await contract.methods.getScores().call();

            console.log("geting scores : ", scores);
            
            // const scoreList = document.getElementById('scoreList');
            // scoreList.innerHTML = '';

            // scores.forEach(score => {
            //     const listItem = document.createElement('li');
            //     // const timestampp = new Date(score.timestamp.toNumber() * 1000).toLocaleString();
            //     listItem.innerText = `Player: ${score.playerName}, Score: ${score.score}`;
            //     scoreList.appendChild(listItem);
            // });
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
    }

    // Initialize the application and submit score if the event is "submit"
    async function handleSubmit() {
        if (event === "submit") {
            console.log("Try to submit score");

            // Wait for init to complete before submitting score
            await init();
            submitScore();
        } else if (event === "getScore") {
            console.log("Try to get      score");

            await init();
            getScores();
        }
    }

    // Call the handleSubmit function
    handleSubmit();
}