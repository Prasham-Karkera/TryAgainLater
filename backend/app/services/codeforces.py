import requests

def fetch_codeforces_stats(username: str):
    """
    Fetch Codeforces user info + solved problems
    """
    info_url = f"https://codeforces.com/api/user.info?handles={username}"
    res_info = requests.get(info_url).json()
    
    subs_url = f"https://codeforces.com/api/user.status?handle={username}"
    res_subs = requests.get(subs_url).json()
    
    solved_problems = set()
    if res_subs["status"] == "OK":
        for sub in res_subs["result"]:
            if sub.get("verdict") == "OK":
                prob = sub["problem"]
                solved_problems.add(f'{prob["contestId"]}{prob["index"]}')
    print(len(solved_problems))
    data = {
        "user_info": res_info.get("result", []),
        "solved_problems": list(solved_problems)
    }
    return data
