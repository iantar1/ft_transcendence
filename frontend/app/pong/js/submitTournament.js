export async function submitTournament(
    event,
    players = null,
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

    // add tournament 
    async function addTournament() {
      const tournamentName = name;
      const player1Name = players.player1;
      const player2Name = players.player2;
      const player3Name = players.player3;
      const player4Name = players.player4;

      if (!contract) {
          alert('Contract is not initialized. Please refresh the page.');
          return false;
      }

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      try {
          await contract.methods.addTournament(
              tournamentName,
              player1Name, 1,
              player2Name, 2,
              player3Name, 3,
              player4Name, 4
          ).send({ from: account });
          return true;
          // alert('Tournament Added!');
      } catch (error) {
          console.error("Error adding tournament:", error);
      }
  }


    // Get scores from the contract
    async function getTournaments() {
      if (!contract) {
          alert('Contract is not initialized. Please refresh the page.');
          return;
      }

      try {
          const tournaments = await contract.methods.getTournaments().call();
          console.table(tournaments);
          return tournaments; // Store globally for filtering
      } catch (error) {
          console.error('Error fetching tournaments:', error);

      }
  }


  // Initialize the application and submit score if the event is "submit"
  async function handleSubmit() {
      if (event === "submit") {
          console.log("Try to submit score");

          // Wait for init to complete before submitting score
          await init();
          const result = await addTournament();
          return result;
      } else if (event === "getScore") {
          console.log("Try to get score");

          await init();
          const result = await getTournaments();
          return result;
      }
  }
    // Call the handleSubmit function
  const response =  await handleSubmit();
  return response;
}