from langchain_openai import AzureChatOpenAI
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import MessagesPlaceholder, ChatPromptTemplate



from dotenv import load_dotenv

load_dotenv()

llm = AzureChatOpenAI(deployment_name="gpt-35-turbo-16k", temperature=1.8)


with open("system_prompt_beta.txt", "r") as f:
    system_prompt = f.read()

prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="history")
        ("human", "{input}")
])


chain = prompt | llm

