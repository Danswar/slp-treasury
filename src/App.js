import { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import axieBg from "./assets/axie_bg.jpg";
import { getSlpBalance } from "./utils/ChainApiDriver";

const WALLET_ADDRESS = "0xd3bd3ed12b4257124196f1635f2f7c7523b06a74";

function App() {
  const [slpBalance, setSlpBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSlpTreasury = async () => {
    try {
      const slp = await getSlpBalance(WALLET_ADDRESS);

      setSlpBalance(slp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSlpTreasury();
  }, []);

  return (
    <Parallax
      bgImage={axieBg}
      bgImageAlt="axie background"
      strength={500}
      blur={{ min: -1, max: 3 }}
    >
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 275, padding: "20px 50px" }}>
          <CardContent>
            {isLoading ? (
              <Skeleton variant="text" />
            ) : (
              <>
                <Typography variant="h6" component="div" align="center">
                  SLP Treasury
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h4">{slpBalance}</Typography>
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/5824.png"
                    alt="slp logo"
                    width={30}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Parallax>
  );
}

export default App;
