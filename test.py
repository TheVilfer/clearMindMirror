from langchain import hub
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = hub.pull("outrun32/sfbtherapy")

with open("system_prompt_beta.txt", "r") as f:
    system_prompt = f.read()

# Declare a chain
sys_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{human_input}"),
    ]
)

print(prompt)
print("-"*15)
print(sys_prompt)